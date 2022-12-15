import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";
import {toJS} from "mobx";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    
    const handleClick = (brand) => {
        if(device.selectedBrand?.id === brand.id) {
            device.setSelectedBrand({});
        } else {
            device.setSelectedBrand(brand)
        }
    }
    
    console.log('selectedBrand', toJS(device.selectedBrand));

    return (
        <Row className="d-flex">
            {device.brands.map(brand =>
                <Card
                    style={{cursor:'pointer'}}
                    key={brand.id}
                    className="p-3"
                    onClick={() => {handleClick(brand)}}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;
