export interface Parameters {
    [key: string]: any
}

export interface OutputContext {
    name: string,
    lifespanCount: number,
    parameters: Parameters,
}

export interface FulfillmentRequest {
    responseId: String
    session: String
    queryResult: {
        queryText: String
        parameters: Parameters
        allRequiredParamsPresent: Boolean
        fulfillmentText: String
        fulfillmentMessages: {}
        outputContexts?: OutputContext[]
        intent: {
            name: string,
            displayName: string,
        }
        intentDetectionConfidence: number
        diagnosticInfo: {}
        languageCode: String
    },
    originalDetectIntentRequest: {},
}

export interface FulfillmentResponse {
    fulfillmentText: string
}