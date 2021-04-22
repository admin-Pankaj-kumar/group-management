import { LightningElement, wire, track } from 'lwc';
import getGroupList from '@salesforce/apex/GroupController.getGroupList';
import IMGURL from '@salesforce/resourceUrl/IMG'; 
export default class GroupMembers extends LightningElement {
    @track groups;
    @track error;
    @track showMembers = false;
    @track groupsMembers = [];
    imgurl = IMGURL; 
    groupMembersHeader;
    @wire(getGroupList)
    wiredGroups({ error, data }) {
        if (data) {
            this.groups = data;
            this.groups = JSON.parse(JSON.stringify(this.groups));
            var filterArrayWithNoGroupMmbr = [];
            for(var i = 0; i<this.groups.length;i++){
                if(this.groups[i].Group_Members__r != null){
                    filterArrayWithNoGroupMmbr.push(this.groups[i]);
                }
            }
            this.groups = filterArrayWithNoGroupMmbr;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.groups = undefined;
        }
    }

    handleChangeRadio(event){
        //console.log('handleChangeRadio called' + event.target.value);
        var groupsLocal = JSON.parse(JSON.stringify(this.groups));
        for(var i = 0; i<groupsLocal.length;i++){
            if(groupsLocal[i].Id == event.target.value && groupsLocal[i].Group_Members__r != null){
                this.showMembers = true;
                this.groupsMembers = JSON.parse(JSON.stringify(groupsLocal[i].Group_Members__r));
                this.groupMembersHeader = 'Members (' + this.groupsMembers.length + '+)';
                break;
            }
        }
    }
}