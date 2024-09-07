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

export interface Review { 
    comment?: string;
    username?: string;
    email?: string;
    picture?: string;
    enable?: boolean;
    /**
     * permet au client d&#039;appouvé le commentaire du  freelancers , apres la realisation de son projet
     */
    approuveReview?: boolean;
    /**
     * publiee le commentaire du projet au grand publique 
     */
    publishedOnline?: boolean;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly deletedAt?: Date;
    /**
     * commentaire reponse a  un projet
     */
    projectId?: string;
}