import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider} from './DataContext.jsx';
import DataObject from './DataObject.jsx';



export default function ResponeDataObject() {   
    return(
        <BrowserRouter>
            <DataProvider>
                <DataObject></DataObject>
            </DataProvider>
        </BrowserRouter>
    )
}
