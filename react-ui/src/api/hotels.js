import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

export default class Hotels{
    constructor(){
        this.host = process.env.REACT_APP_API + "hotels";
    }
    /*async list() : Promise<[Number, string, hotelList]>{
        let [resStatus, resError] = [400, "Nothing found"];
        let [hotelList] = [];
        try {
            await new Promise((resolve, reject) => this.instance
            .get(process.env.REACT_APP_API + "hotels", {
                headers: {Authorization: `Bearer ${process.env.REACT_APP_API_Token}`}})
            .then(response => {
                hotelList = response.data.result;
                [resStatus. resError] = [response.status, "success"];
                //resolve(response);
            })
        )} catch(err){

        }
        return [hotelList];
    }*/
}