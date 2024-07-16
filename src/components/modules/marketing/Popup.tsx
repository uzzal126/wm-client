import { betterParse } from "@/helpers/misc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";


export default function PopUp({marketing_tools}: any) {
    const router = useRouter()
    const [modal, setModal] = useState(false);
    
    const toggle = () => setModal(!modal);

    const pop_up = Array.isArray(marketing_tools)
    ? marketing_tools.find(e => e?.slug === "popup")
    : null;

    if(!pop_up || !pop_up?.code) return (
        <></>
    )

    const { background, contents, btn, showForm } = betterParse(`${pop_up?.code}`);
    // Construct HTML string
    const htmlString = `
        <div style="background-image: url('${background}'); background-size: cover; background-position: center; height: 300px; position: relative;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 100%;">
            ${contents}
            ${btn && btn?.text && typeof(btn?.text) === 'string' && btn?.text?.length !== 0 ? `<button href="${btn?.link}">${btn?.text}</button>` : ''}
        </div>
        ${showForm ? '<form style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);">...</form>' : ''}
        </div>
    `;

    useEffect(() => {
        if(document?.visibilityState === 'visible' && router?.pathname === '/') {
            setTimeout(() => {
                setModal(true)
            }, 5000)
        }
    }, []) 
  
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="lg" > 
        <button
              className="rounded btn btn-sm btn-danger position-absolute"
              onClick={() => setModal(false)}
              style={{
                zIndex: 999999,
                right: "10px",
                top: "10px"
              }}
            >
              <i className="fa fa-times" />
        </button>
        <ModalBody>
        <div dangerouslySetInnerHTML={{__html: htmlString}} />
        </ModalBody>
    </Modal>
  )
}