import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink,setPublic_id}) {
    
    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (files?.length == 1) {
            const data = new FormData();
            data.set('image', files[0]);
            const uploadPromise=fetch('/api/upload', { method: 'POST', body: data })
                .then(response=>{
                    if(response.ok)
                    {
                        return response.json().then(uploadedImage=>{
                            console.log("uploaded image ",uploadedImage);
                            setLink(uploadedImage.secure_url);
                            setPublic_id(uploadedImage.public_id);
                        })
                    }
                    throw new Error("Something went wrong");
                     });
            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Uploading completed',
                error: 'Upload error',
            });
        }
    }
    return (
        <div>
            <div className="p-2 rounded-lg relative mb-1 w-[180px] h-[180px] bg-gray-200">
                {
                    link && (<Image className="rounded-lg w-full h-full" fill src={link} alt={"avatar"} />)
                }
                {
                    !link && (
                        <div className="flex items-center justify-center text-gray-500 h-full w-full">
                            <span>Upload Image</span>
                        </div>
                    )
                }
            </div>
            <label>
                <input type="file" className="hidden" onChange={handleFileChange}></input>
                <span className="block border-gray-200 rounded-lg p-2 text-center cursor-pointer border hover:bg-gray-300 active:bg-gray-300 ">Edit</span>
            </label>
        </div>
    )
}