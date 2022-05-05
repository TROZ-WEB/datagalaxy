interface ScreenConfigurationAttribute {
    attributeKey: string;
    format: string;
    name: string;
}

interface ScreenConfigurationCategory {
    attributes: ScreenConfigurationAttribute[];
    id: string;
    isHidden: boolean;
    isSystem: boolean;
    name: string;
}

export interface ScreenConfiguration {
    type: string;
    dataType: string;
    isClientLevel: boolean;
    categories: ScreenConfigurationCategory[];
}
