// Model (модель). Получает данные от контроллера, выполняет необходимые операции и передаёт их в вид.


const { google } = require('googleapis');
const { getAuthClient } = require('./auth');

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

const findRowIndex = ( sheet, message ) => {
   const rowIndex = sheet.data[0].rowData.findIndex( ( item ) => {
      if (item.values) {
         item.values.find(obj => +obj.formattedValue === message)
      }
   });

   return rowIndex;
};

const model = async ( ctx ) => {
   const range = 'купи котам посрать';
   const apiClient = await getApiClient();
   const [sheet] = await getValuesData( apiClient, range );
   //
   const arrayMsg =  ctx.message.text.split('\n');
   const indexStartList = arrayMsg.findIndex(item => item.startsWith('Твои предложения'));
   const regExp = /\(([^)]+)\)/;
   const resoursesCount = regExp.exec(arrayMsg[indexStartList])[1].split('/')[0];
   const resourses = arrayMsg.splice(indexStartList + 1, resoursesCount * 2)
   console.log( resoursesCount, resourses, sheet );
   const resoursesMap = {};
   for (let i = 0; i < resourses.length; i += 2) {
      const resoursesCount = Number(resourses[i + 1].split('x')[0]);
      console.log(resoursesCount)
      if (resoursesMap.hasOwnProperty(resourses[i])) {
         resoursesMap[resourses[i]] += resoursesCount;
      } else {
         resoursesMap[resourses[i]] = resoursesCount;
      }
   }
   console.log(resoursesMap)
   //
   const rowIndex = findRowIndex( sheet, ctx.from.id );
   return ctx.reply(rowIndex)
};

module.exports = model;
