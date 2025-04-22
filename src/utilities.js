/**
 * Return the bootstrap color for this state
 * 
 * Returns the bootstrap color for this state when this state has been entered.
 * 
 * @returns {string} bootstrap color for this state
 */
export function bootstrapEntryColor(state, defaultColor) {
    if (state.name == "fixed") {
        return "success";
    } else if (state.name == "consulted") {
        return "info";
    } else if (state.name == "no-time") {
        return "warning";
    } else if (state.name == "unfixable") {
        return "danger";
    }
    return defaultColor;
}