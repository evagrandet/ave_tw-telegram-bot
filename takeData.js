const { google } = require('googleapis');
const { getAuthClient } = require('./googleAuth');

const getApiClient = async () => {
   const authClient = await getAuthClient();
   const { spreadsheets: apiClient } = google.sheets( {
       version : 'v4',
       auth    : authClient,
   } );

   return apiClient;
};

const getValuesData = async ( apiClient, range ) => {
   const { data } = await apiClient.get( {
       spreadsheetId   : '1GErP_F_k0H8iZq4hHi-fMrEgg3zTT_Iaa-KFtsQ-_zc',
       ranges          : range,
       fields          : 'sheets',
       includeGridData : true,
   } );

   return data.sheets;
};

const takeData = async ( ctx ) => {
   const range = 'купи котам посрать';
   const apiClient = await getApiClient();
   const [sheet] = await getValuesData( apiClient, range );

   console.log( ctx.message.forward_from.id, sheet );
};

module.exports = takeData;
