/**
 * Api documentation
 * Api documentation
 *
 * OpenAPI spec version: 1.0.0
 * Contact: codeguessdev237@codeguess.cm
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface Invoice { 
    name?: string;
    totalAmount?: number;
    status: string;
    invoiceDate?: Date;
    readonly createdAt?: Date;
    projectsId: string;
}