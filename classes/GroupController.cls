public class GroupController {
    public GroupController(){}
    
    @AuraEnabled(cacheable=true)
    public static List<Group__c> getGroupList() {
        return [SELECT Id, Name,(select Id,Member__r.Name, Group__c from Group_Members__r) FROM Group__c LIMIT 10];
    }
}