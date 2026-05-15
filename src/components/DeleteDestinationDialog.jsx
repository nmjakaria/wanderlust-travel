'use client'
import { AlertDialog, Button, toast } from '@heroui/react';
import { redirect } from 'next/navigation';
import { RiDeleteBin6Line } from 'react-icons/ri';

const DeleteDestinationDialog = ({destination}) => {
    const {_id, destinationName } = destination;

    const hendleDeleteDestination = async () => {
        const res = await fetch(`http://localhost:5000/destination/${_id}`,
            {
                method: "DELETE",
                headers: {
                    "content-type" : 'application/json',
                }
            }
        )
        const data = await res.json()
        if(res.ok){
            toast.success("Delete destination sucessfully")
        }
        redirect('/destinations')
    }

    return (
        <div>
            <AlertDialog>
                <Button variant="outline" className="rounded-md border-red-200 text-red-500 hover:bg-red-50 font-medium">
                    <div className="flex items-center justify-center gap-2">
                        <span>Cancel</span>
                        <RiDeleteBin6Line size={20} />
                    </div>
                </Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Delete the destination permanently?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p>
                                    This will permanently delete the <strong>{destinationName}</strong> destination and all of its data. This action cannot be undone.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button onClick={hendleDeleteDestination} slot="close" variant="danger">
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

export default DeleteDestinationDialog;