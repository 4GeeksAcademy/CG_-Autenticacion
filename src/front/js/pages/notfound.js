import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const NotFound = () => {


    return (
        
        <div className="container text-center">
            <br></br>
            <br></br>
            <h1>
                User doesn't exist
            </h1>
            <br></br>
            <br></br>
            <br></br>
            <h2>
            Check email and password!
            </h2>
            <br></br>
            <br></br>
            <br></br>
            <Link to="/login" className="btn btn-primary">Back to Login</Link>
        </div>
        





    )





}