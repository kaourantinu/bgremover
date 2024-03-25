'use client'

import styles from '../page.module.css'
import Image from "next/image";
import { useState } from "react"
import { BsArrowRightSquareFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function ImageUpload(){

    const [image, setImage] = useState<File | null>(null);
    const [removedBackgroundImage, setRemovedBackgroundImage] = useState<string | null>(null);
    const [isLoading, setLoadingState] = useState<boolean | null>(null);
    const [errorText, setErrorText] = useState<string | null>(null);

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const deleteImage = () => {
        setImage(null);
        setRemovedBackgroundImage(null);
        setLoadingState(null);
    };

    const removeBackground = async () => {
        if (image) {
            setLoadingState(true)
            const formData = new FormData();
            formData.append('image_file', image);
    
            try {
                const response = await fetch('/api/sendImage', {
                    method: 'POST',
                    body: formData
                });
    
                if (response.ok) {
                    const image = await response.blob()
                    const imageUrl = URL.createObjectURL(image)
                    setRemovedBackgroundImage(imageUrl)
                    setLoadingState(false)              
                } else {
                    if (response.status === 402 || response.status === 429) {
                        setErrorText('Cet outil est limité à 150 images traitées par mois. Le quota a été dépassé : veuillez revenir le mois prochain !');
                    } else {
                        setErrorText('Une erreur est survenue, veuillez contacter le développeur de la plateforme.');
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'arrière-plan:', error);
            }
        }
    };
    

    return (
        <section id={styles.appsection}>
            {errorText && (
                <div id={styles.popuperror}>
                    <div id={styles.popupcontent}>
                        <p>{errorText}</p>
                        <button className={styles.button} onClick={() => setErrorText(null)}>Revenir à l&apos;accueil</button>
                    </div>
                </div>
            )}
            <div id={styles.uploaddiv}>
                {image === null ? (
                    <div className={styles.imagepreview}>
                        <h2>Sélectionner votre image</h2>
                        <input id={styles.input} type="file" onChange={uploadImage} accept=".jpg, .jpeg, .png"/>
                    </div>
                ) : (
                    <div className={styles.imagepreview}>
                        <h2>Aperçu de votre image</h2>
                        <div className={styles.imagecontainer} id={styles.originalimagecontainer}>
                            <Image src={URL.createObjectURL(image)} alt="Image Preview" width={1000} height={1000}/>
                            <button id={styles.removebutton} onClick={() => deleteImage()}><MdDelete /></button>
                        </div>
                        <button onClick={removeBackground} className={styles.button}>Enlever l&apos;arrière-plan</button>
                    </div> 
                )}
            </div>
            <div id={styles.arrowdiv}>
                <BsArrowRightSquareFill size='3rem'/>
            </div>
            <div id={styles.resultdiv}>
                {removedBackgroundImage === null ? (
                    <div className={styles.imagepreview}>
                        {isLoading === null ? (
                            <p>Après avoir sélectionné votre image, cliquez sur &quot;Enlever l&apos;arrière-plan&quot; et découvrez le résultat ici !</p>
                        ) : (
                            <p>Chargement...</p>
                        )}
                    </div>
                ) : (
                    <div className={styles.imagepreview}>
                        <h2>Votre image détourée</h2>
                        <div className={styles.imagecontainer} id={styles.removedbgimagecontainer}>
                            <Image src={removedBackgroundImage} alt="Image Preview" width={100} height={100}/>
                        </div>
                        <a href={removedBackgroundImage} download={`${image?.name}-removedbg.png`} className={styles.button}>Télécharger l&apos;image</a>
                    </div>
                )}
            </div>
        </section>
    );
}
