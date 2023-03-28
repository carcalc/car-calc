import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, QueryDocumentSnapshot } from 'firebase/firestore';
import type { Car } from '@/types';

// Initialize Firebase
const config = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: 'cars-ffed2.firebaseapp.com',
  databaseURL: 'https://cars-ffed2.firebaseio.com',
  projectId: 'cars-ffed2',
  storageBucket: 'cars-ffed2.appspot.com',
  messagingSenderId: '768861179345',
};

const app = initializeApp(config);
const db = getFirestore(app);

export async function getCars(): Promise<Car[]> {
  const cars: Car[] = [];
  const querySnapshot = await getDocs(collection(db, 'cars'));

  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    const car = doc.data();
    car.id = doc.id;
    cars.push(car as Car);
  });

  cars.sort((a, b) => a.name.localeCompare(b.name));

  return cars;
}
