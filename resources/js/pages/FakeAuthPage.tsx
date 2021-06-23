import React from "react";

const FakeAuthPage = () => (
    <>
        <div
            style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
            }}
        >
            <button
                style={{
                    margin: "0 auto",
                    fontSize: "16px",
                    padding: "1rem",
                    width: "78%",
                    marginTop: "10%",
                    marginLeft: "10%",
                }}
                onClick={() => {
                    window.opener!.postMessage({ code: "test" }, "*");
                    window.close();
                }}
            >
                Log into Platform
            </button>
        </div>
    </>
);
export default FakeAuthPage;
