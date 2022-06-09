/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unreachable */
/* eslint-disable no-constant-condition */

/* 
	[VUE] Main imports
	Define main imports to create the DEBUG
*/
	// NPM modules
	import { reject } from 'core-js/fn/promise';
import Dexie from 'dexie'; // => https://www.npmjs.com/package/dexie
	import { v4 as uuidv4 } from 'uuid';

	// App modules
	import StoreModule from '../store/index'; // Data binding => https://vuex.vuejs.org
//

/*
	[VUE] DEBUGs
	Define properties and methods
*/
	export default class DexieDb {
		/* 
			[INIT] Constructor
			Define DEBUG properties
		*/
			constructor( dbName ){
				// Init IndexDB with Dexie.js
				this.dexie = new Dexie( dbName );
			}
		//

		/* 
			[INDEXDB] Dexie
			Initiate Dexie IndexDB
		*/
			initDexie(){
				/* 
					[DTO] Dexie.js
					Define IndexDB collection based on OpenAPI DTOs
				*/
					/* 
                        [DEBUG] Init
                        Create new collection
                    */
                        this.setIndexDbTable( 
                            +process.env.VUE_APP_INDEXBD_VERSION,
                            schema,
                            indexes
                        );
                    //
				//
			}
		//

		/* 
            [METHOD] setIndexDbTable()
            Used to create IndexDB table before create App
			@params{version} IndexDB version to use NUMBER
			@params{collectionName} IndexDB table to create STRING
			@params{collectionProp} IndexDB copllection properties [STRING]
        */
			async setIndexDbTable( dbVersion, collectionName, collectionProp ){
                return new Promise( async resolve => {
					try {
                        // Add UUID property end set Dexie table
                        collectionProp.push( `uuid` )

                        /* 
                            [DEXIE] Create
                            Add new collection
                        */
                            const newDexieTable = this.dexie.version( dbVersion ).stores({
                                [ collectionName ]: collectionProp.join(', ')
                            });
                        //
        
                        // Resolve Promise
                        return resolve(newDexieTable);
                    } 
                    catch (error) {
                        return reject(error)
                    }
				})
			}
		//

		/* 
            [METHOD] saveIndexDbObject()
            Used to create IndexDB table before create App
			@params{collectionName} IndexDB collection to create STRING
			@params{tableIndex} IndexDB collection index [STRING]
        */
			saveIndexDbObject( collectionName, itemValue ){
				return new Promise( async resolve => {
					try {
                        /* 
                            [DEXIE] Create
                            Add new object in specific collection
                        */
                            const newIndexedObject = this.dexie[ collectionName ].add( itemValue );
                        //
        
                        // Resolve Promise
                        return resolve(newIndexedObject);
                    } 
                    catch (error) {
                        return reject(error)
                    }
				})
			}
		//

		/* 
            [METHOD] getIndexDbObject()
            Used to create IndexDB table before create App
			@params{collectionName} IndexDB collection to create STRING
			@params{uuids} list of UUIDs [STRING]
        */
			getIndexDbObject( collectionName, where,  uuids ){
                return new Promise( async resolve => {
					try {
                        /* 
                            [DEXIE] Get
                            Gett all objects from specific collection
                        */
                            const preparedResponse = await this.dexie[collectionName].toArray();
                        //
        
                        // Resolve Promise
                        return resolve(preparedResponse);
                    } 
                    catch (error) {
                        return reject(error)
                    }
				})
			}
		//

		/* 
            [METHOD] getIndexDbObject()
            Used to create IndexDB table before create App
			@params{collectionName} IndexDB collection to create STRING
			@params{uuids} list of UUIDs [STRING]
        */
			updateObject( collectionName, key, changes ){
				return new Promise( async resolve => {
                    try {
                        /* 
                            [DEXIE] Update
                            Update one object from ID
                        */
                            const preparedResponse = await this.dexie[collectionName].update(key, changes)
                        //
        
                        // Resolve Promise
                        return resolve(preparedResponse);
                    } 
                    catch (error) {
                        return reject(error)
                    }
                })
			}
		//

		/* 
            [METHOD] deleteIndexDbObject()
            Used to create IndexDB table before create App
			@params{collectionName} IndexDB collection to create STRING
			@params{uuids} list of UUIDs [STRING]
        */
			deleteIndexDbObject( collectionName, id ){
                return new Promise( async resolve => {
                    try {
                        /* 
                            [DEXIE] Delete
                            Delete one object from ID
                        */
                            const preparedResponse = await this.dexie[collectionName].delete( id )
                        //
        
                        // Resolve Promise
                        return resolve(preparedResponse);
                    } 
                    catch (error) {
                        return reject(error)
                    }
                })
			}
		//

		/* 
            [METHOD] clearTable()
            Used to create IndexDB table before create App
			@params{collectionName} IndexDB collection to create STRING
        */
			clearTable( collectionName ){
				return new Promise( async ( resolve ) => {
                    try {
                        /* 
                            [DEXIE] Clear
                            Clear all object from collection
                        */
                            const preparedResponse = await this.dexie[collectionName].clear()
                        //
        
                        // Resolve Promise
                        return resolve(preparedResponse);
                    } 
                    catch (error) {
                        return reject(error)
                    }
				})
			}
		//
	}
//
