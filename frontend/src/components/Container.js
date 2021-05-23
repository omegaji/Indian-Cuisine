import React from 'react'
import Count from './Count'
import FlavorState from './FlavorState'
import Reciepe from './Reciepe'
import {Find} from "./Find"
import About from "./About"

export const Container = () => {
    return (
        <div id="container" className="container">
            <Count/>
            <FlavorState/>
            <Find/>
            <Reciepe/>
            <About/>
        </div>
    )
}
