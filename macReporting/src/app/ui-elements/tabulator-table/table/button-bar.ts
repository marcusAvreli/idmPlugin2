const ADD_REMOVE_TEMPLATE = `
<div class="add-remove-control">
    <div class="pull-left">
        <div class="add-remove-fico">
            <button
                type="button"
                class="btn btn-link btn-table-action btn-table-add-row "
                title="Add New Row"
                tabindex="-1"
            />
            <button
                type="button"
                class="btn btn-link btn-table-action btn-table-remove-row disabled"
                title="Delete Selected Row"
                disabled
                tabindex="-1"
            />
        </div>
    </div>
</div>
`;


export default class AddRemove {
    /**
     * @param {*} table The Tabulator object
     * @param {function} rowIndexGenerator Generates a unique row index value for the table
     * @param {boolean} autoinc Whether to use row indices auto increment mode
     */
    constructor(table, rowIndexGenerator, autoinc) {
        this.$addRemoveControl = $(ADD_REMOVE_TEMPLATE);
        this.indicesColumns = [];
        this.entitiesColumns = [];
        this.allSetValues = [];
        this.data = [];
        this.selectedRow = undefined;
        this.table = table;
        this.rowIndexGenerator = rowIndexGenerator;
        this.autoinc = autoinc;
        this.defaultScenario = undefined;
        this.enabled = false;
    }

    /**
     *
     * @param {Element} container
     * @memberof AddRemove
     */
    appendTo(container) {
        this.$addRemoveControl.appendTo(container);
        this.$addRemoveControl.on('click', '.btn-table-add-row', evt => {
            if (this.autoinc) {
                this.autoAddRow();
            } else {
                this.openAddRowDialog();
            }
        });
        this.$addRemoveControl.on('click', '.btn-table-remove-row', evt => this.removeRow());
    }
}