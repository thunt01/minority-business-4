import React from "react";

const ConfigBusinessPromo = () => {


    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Access the form data
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const message = formData.get("message");
        const url = formData.get("url");
        

        // Log the form data
        console.log("Ad Title:", title);
        console.log("Ad Message:", message);
        console.log("URL:", url);
        
        event.target.reset();

        

    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <label htmlFor = "title">Enter Ad Title</label><br/>
                <input type = "text" id = "title" name = "title"></input><br/>

                <label htmlFor = "message">Enter Ad Message</label><br/>
                <input type = "text" id = "message" name = "message"></input><br/>

                <label htmlFor="url">Enter a URL to a landscape photo</label>
                <input type="url" name="url" id="url" placeholder="https://example.com" pattern="https://.*"/>

                
                <input type="submit" value="Submit" />
                


            </form>
        </div>
    );
}

export default ConfigBusinessPromo;