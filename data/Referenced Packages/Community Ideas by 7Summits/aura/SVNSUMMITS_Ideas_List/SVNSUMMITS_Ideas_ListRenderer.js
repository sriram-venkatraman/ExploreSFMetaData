({
    rerender: function(component, helper) {
        // By default, after the component finished loading data/handling events,
        // it will call this render function this.superRender() will call the
        // render function in the parent component.
        var ret = this.superRerender();
        
        svg4everybody();
        
        // Calls the helper function to append the SVG icon
        if (component.get("v.displayMode") == 'Full')
        {
            helper.initializeDropdown(component);
        }
        return ret;
    }
})