import React from 'react'

 const About = () => {
    return (
        <div className="about">
            <div>
                <p>&#x1F916; Tech Stack used &#x1F916; </p>
                <p><span>React</span> <span>PouchDB</span><span>Express</span><span>Pandas</span> <span>HTML</span><span>CSS</span></p>
                <p> With the help of python pandas I converted the dataset into proper JSON format and pushed it into PouchDB. I set up my own backend API using express and generated the frontend using React. Python was only used for preprcoessing the data, hence -1 can be seen in some outputs denoting the missing data. </p>
                <div className="notes">&#x270D;</div>
            </div>
            <div>
                <p> &#x1F4DC; Who gave the dataset &#x1F4DC;</p>
                <p><span>Kaggle</span> <span>Hebbars Kitchen</span><span>Archana's Kitchen</span><span>Wikipedia</span> <span>CSS</span></p>
                <p> I got the dataset from kaggle, check it out <a href="https://www.kaggle.com/nehaprabhavalkar/indian-food-101">here</a>. It was in CSV format, hence before using it in our website I had to preprocess with Python and fed the json to my PouchDB database. Kudos to Neha Prabhavalkar for this amazing dataset! </p>
                <div className="notes">&#x270D;</div>

            </div>
        </div>
    )
}

export default About