import React, { useState } from 'react';
import { FiGift } from 'react-icons/fi';
import buidldspaceWhite from './assets/buildspace-white.svg';
import tecWhite from './assets/tec-white.svg';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export const Form = () => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyAyku798T8zZZkUAAw6qLUiL8oxQcyGDlI',
    authDomain: 'recluta-700b5.firebaseapp.com',
    projectId: 'recluta-700b5',
    storageBucket: 'recluta-700b5.appspot.com',
    messagingSenderId: '169670184817',
    appId: '1:169670184817:web:96a28c2120ccb9905c30d0',
    measurementId: 'G-VQSVRKRFN9',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const postForm = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Check if text is email
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!emailRegex.test(email)) {
      // Update not valid email
      setInvalidEmail(true);
    } else {
      // Update valid email and upload email
      setInvalidEmail(false);
      const firestore = getFirestore(app);
      const collectionFormLanding = collection(firestore, '/form-landing');
      const docRef = await addDoc(collectionFormLanding, {
        email: email,
      });
      setEmailSent(true);
    }
  };

  return (
    <div>
      <div className="pt-80 max-w-6xl m-auto" id="form">
        <div className="bg-slate-900 flex flex-col justify-center items-center space-y-12 p-14 rounded-2xl">
          <div className="max-w-xl space-y-8 flex flex-col justify-center items-center">
            <div className="bg-blue-200 px-4 py-2 rounded-full hover:scale-105 duration-300 transition-all flex justify-center items-center space-x-2">
              <FiGift className="text-blue-700 " size={24} />
              <p className="font-bold text-blue-700 text-center">
                Registrate y obtén 3 meses gratis
              </p>
            </div>

            <h3 className="text-2xl font-bold text-white text-center">
              Agiliza tu proceso de contratación y manten a tu equipo
              sincronizado
            </h3>
            <form className="space-x-4 m-auto flex justify-center">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
                className="input input-ghost w-full max-w-xs text-white"
              />
              <button
                onClick={postForm}
                className={`btn  ${
                  emailSent
                    ? 'btn-success'
                    : invalidEmail
                    ? 'btn-error'
                    : 'btn-primary'
                }`}
                type="submit"
              >
                {emailSent
                  ? 'Email enviado correctamente!'
                  : invalidEmail
                  ? 'Ups! Tienes un error en tu email'
                  : 'Obtén acceso anticipado'}
              </button>
            </form>
          </div>
          <div className="flex justify-center space-x-8">
            <img src={buidldspaceWhite} className="" />
            <img src={tecWhite} className="" />
          </div>
        </div>
      </div>
    </div>
  );
};
