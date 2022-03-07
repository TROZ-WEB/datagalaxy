export interface AttributeType {
    color: string;
    description: string;
    id: string;
    isActive: boolean;
    isNative: boolean;
    isUserSuggestionEnabled: boolean;
    label: string;
}

export interface AttributeDefinitionType {
    attributeKey: string;
    dataType: string;
    description: string;
    format: string;
    isCustom: boolean;
    isEditable: boolean;
    isMandatory: boolean;
    name: string;
}
