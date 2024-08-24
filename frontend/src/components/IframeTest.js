const IframeTest = () => {
    return (  
        <div className="iframeTest">
            <iframe src="http://192.168.1.38:81/stream" frameborder="0"></iframe>
            <button style={{ position:"absolute", left:'5rem'}}>Click here</button>
        </div>
    );
}
 
export default IframeTest;