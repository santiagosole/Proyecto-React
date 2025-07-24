import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
function TraerCollection({ nombreCollection }) {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const ref = collection(db, nombreCollection);
    getDocs(ref).then((snap) => {
      setDocs(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [nombreCollection]);
  return (
    <div style={{ padding: "2rem" }}>
      <h3>Contenido de colección: {nombreCollection}</h3>
      <pre>{JSON.stringify(docs, null, 2)}</pre>
    </div>
  );
}
export default TraerCollection;
