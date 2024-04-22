import { Button } from "react-bootstrap";


function Status(props){
    
    let buttonVariant;

    if(props.colour === "Not start yet"){
        buttonVariant = "info";
    } else if(props.colour === "Progress"){
        buttonVariant = "warning";
    } else if(props.colour === "Completed"){
        buttonVariant = "success";
    }

    return (
        // <h6 ><span class={`badge badge-${buttonVariant}`}>{props.colour}</span></h6>
        <Button className={`btn btn-${buttonVariant} btn-sm m-2 p-2`}>{props.colour}</Button>

    );
}

export default Status;
