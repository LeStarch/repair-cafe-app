import json
import time
from pathlib import Path
from .settings import RUNTIME_PATH


class EventConfiguration(object):
    """ Class to store event configuration information
    
    Stores event configuration across multiple processes using an event.json file.
    This file is protected by an event.json.lock file to prevent partial updates across
    the space.
    """
    def __init__(self):
        """ Set up pathing information """
        runtime_path = Path(RUNTIME_PATH)
        runtime_path.mkdir(parents=True, exist_ok=True) 
        self.file = runtime_path / "event.json"
        self.lock = runtime_path / "event.json.lock"

    def file_lock_helper(self, mode, function, *args, timeout=1, **kwargs):
        """ Open file with mode, and perform function
        
        Opens the file with the given mode, and performs the function on the file_handle by passing in args/kwargs
        after locking the lock file.

        This function locks a lock file first, in order to protect the operation.  It will timeout after a passed in
        timeout if the lockfile cannot be grabbed.  The timeout defaults to 1 second.

        Args:
            mode: "r", "w", etc (filemode)
            function: function taking file_handle, *args/**kwargs
            *args: positional args to pass into function
            timeout: timeout in seconds. Default: 1 second
            **kwargs: keyword args to pass into function
        """
        # Sleep wait until lockfile available
        start_time = time.time()
        while time.time() < start_time + timeout:
            try:
                self.lock.touch(exist_ok=False)
                assert self.lock.exists(), "Touch lock failed"
                break
            # Sleep when lockfile exists
            except FileExistsError:
                time.sleep(0.001)
                continue
        else:
            raise TimeoutError(f"Failed to get lockfile within {timeout} seconds")
        try:
            # Perform locked operation
            with open(self.file, mode) as file_handle:
                args = [args[0], file_handle, *args[1:]] if args else [file_handle]
                return function(*args, **kwargs)
        # Always delete the lock
        finally:
            self.lock.unlink()  


    def write(self, event_data, timeout = 1):
        """ Write event data
        
        Writes event data protected by a lockfile. Timeout to aquire the lockfile may be provided.

        Args:
            event_data: new (complete) event data
            timeout: timeout to acquire lockfile (default 1 second)

        """
        return self.file_lock_helper("w", json.dump, event_data, timeout=timeout)
    
    def read(self, timeout = 1):
        """ Read event data
        
        Read event data protected by a lockfile. Timeout to aquire the lockfile may be provided.

        Args:
            timeout: timeout to acquire lockfile (default 1 second)
        Returns:
            event data read from file
        """
        return self.file_lock_helper("r", json.load, timeout=timeout)