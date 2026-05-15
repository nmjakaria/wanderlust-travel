"use client";

import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

const CancelBokingAlert = ({bookingId}) => {

    const handleCancelBooking = async () => {
        const res = await fetch(`http://localhost:5000/booking/${bookingId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })

        const data = await res.json()
        if(data){
            toast.success(`Delete booking info`)
        }
        window.location.reload();
    }

    return (
        <div>
            <AlertDialog>
                <Button
                    variant="bordered"
                    className="border-red-200 text-red-500 hover:bg-red-50 font-semibold rounded-lg min-w-25"
                >
                    <div className="flex items-center gap-2">
                        <RiDeleteBin6Line />
                        <span>Cancel</span>
                    </div>
                </Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Cancel booking permanently?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p>
                                    This will permanently delete booking id <strong>{bookingId}</strong>. This action cannot be undone.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button onClick={handleCancelBooking} slot="close" variant="danger">
                                    Delete
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default CancelBokingAlert;


