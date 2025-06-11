import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Table from "../components/ui/Table";

export default function Home() {
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  const sampleData = [
    { name: "Item 1", value: "A" },
    { name: "Item 2", value: "B" },
  ];

  const columns = [
    { key: "name", label: "Name" },
    { key: "value", label: "Value" },
  ];

  return (
    <Card>
      <h2 className="text-xl mb-2">Home</h2>
      <p>Server says: {message}</p>

      <Button onClick={() => setModalOpen(true)} className="mt-4">
        Open Modal
      </Button>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>This is a reusable modal</p>
      </Modal>

      <div className="mt-4">
        <Table data={sampleData} columns={columns} />
      </div>
    </Card>
  );
}
