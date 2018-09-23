/**
 * GenericValueConverter:
 *
 * Converts a generic object (any object) for use with a view.
 * @author lestarch
 */
export class GenericObjectValueConverter {
    /**
     * Conversions on the way to the view.
     */
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}
