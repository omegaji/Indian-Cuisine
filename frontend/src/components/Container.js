import React from 'react'
import Count from './Count'
import FlavorState from './FlavorState'
import Reciepe from './Reciepe'
export const Container = () => {
    return (
        <div className="container">
            <Count/>
            <FlavorState/>
            <Reciepe/>
        </div>
    )
}
