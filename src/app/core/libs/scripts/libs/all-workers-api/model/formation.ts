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

export interface Formation { 
    title?: string;
    description?: string;
    trainer?: string;
    periodStart?: Date;
    periodEnd?: Date;
    location: string;
    /**
     * Type de formation (présentiel, en ligne, hybride, etc.)
     */
    type?: string;
    price?: number;
    /**
     * Niveau de la formation (débutant, intermédiaire, avancé, etc.)
     */
    level?: string;
    /**
     * Prérequis pour suivre la formation
     */
    prerequis?: string;
    /**
     * Statut de la formation (en attente, confirmée, annulée, etc.)
     */
    status?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly deletedAt?: Date;
}