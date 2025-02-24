"use client";
import { GiTakeMyMoney } from "react-icons/gi";
import { useState } from "react";
import PersonInput from "./components/PersonInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const [people, setPeople] = useState([
    { name: "", items: [{ name: "", price: 0 }] },
    { name: "", items: [{ name: "", price: 0 }] },
  ]);
  const [total, setTotal] = useState({
    discount: 0,
    deliveryFee: 0,
    serviceFee: 0,
  });
  const [result, setResult] = useState([]);

  const addPerson = () => {
    setPeople([...people, { name: "", items: [{ name: "", price: 0 }] }]);
  };

  const handleTotalChange = (e) => {
    const { name, value } = e.target;
    setTotal({ ...total, [name]: value === "" ? 0 : parseFloat(value) });
  };

  const calculateTotal = () => {
    const grandTotal = people.reduce((acc, person) => {
      const personTotal = person.items.reduce(
        (itemAcc, item) => itemAcc + parseFloat(item.price),
        0,
      );
      return acc + personTotal;
    }, 0);

    const totalWithFees =
      grandTotal - total.discount + total.deliveryFee + total.serviceFee;

    const individualTotals = people.map((person) => {
      const personTotal = person.items.reduce(
        (itemAcc, item) => itemAcc + parseFloat(item.price),
        0,
      );
      const percentage = personTotal / grandTotal;
      const amountToPay = percentage * totalWithFees;
      const personDiscount = percentage * total.discount;
      const totalSavings = personTotal * (total.discount / grandTotal);
      const hemat = personTotal - amountToPay;
      const finalAmount =
        personTotal -
        totalSavings +
        percentage * total.deliveryFee +
        percentage * total.serviceFee;
      return {
        name: person.name,
        items: person.items,
        totalBeforeDiscount: personTotal.toFixed(0),
        discount: totalSavings.toFixed(0),
        amountToPay: finalAmount.toFixed(0),
        hemat: hemat.toFixed(0),
      };
    });

    setResult(individualTotals);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center justify-center my-5 font-bold text-2xl">
        <div className="bg-cyan-100 p-2 flex items-center justify-center rounded-lg group hover:cursor-pointer hover:bg-red-50 transition-all">
          <div className="group-hover:-rotate-[26deg] transition-all">
            <GiTakeMyMoney />
          </div>
          <div className="group-hover:rotate-3 group-hover:translate-x-0.5 transition-all">
            SPLITBILL
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {people.map((person, index) => (
          <PersonInput
            key={index}
            person={person}
            setPeople={setPeople}
            people={people}
            index={index}
          />
        ))}
      </div>
      <Button onClick={addPerson} className="w-full">
        Tambah Orang
      </Button>
      <Card className="my-4">
        <CardContent className="gap-2 p-4">
          <div className="flex flex-col md:flex-row  md:items-center gap-2">
            <Label className="whitespace-nowrap">Diskon</Label>
            <Input
              type="number"
              name="discount"
              value={total.discount === 0 ? "" : total.discount}
              onChange={handleTotalChange}
              placeholder="Total diskon"
            />
            <Label className="whitespace-nowrap">Biaya Pengiriman</Label>
            <Input
              type="number"
              name="deliveryFee"
              value={total.deliveryFee === 0 ? "" : total.deliveryFee}
              placeholder="Biaya pengiriman"
              onChange={handleTotalChange}
            />
            <Label className="whitespace-nowrap">Biaya Layanan</Label>
            <Input
              type="number"
              name="serviceFee"
              value={total.serviceFee === 0 ? "" : total.serviceFee}
              placeholder="Biaya layanan"
              onChange={handleTotalChange}
            />
          </div>
        </CardContent>
      </Card>
      <Button
        className="w-full text-lg bg-green-700 hover:bg-green-500"
        onClick={calculateTotal}
      >
        Hitung
      </Button>
      <h2 className="text-2xl font-bold text-center mt-10 mb-2">
        {result.length > 0 ? "Hasil" : ""}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
        {result.map((res, index) => (
          <Card key={index} className="mb-4">
            <CardHeader className="flex justify-center items-center">
              <CardTitle className="font-bold text-xl">{res.name}</CardTitle>
            </CardHeader>
            <CardContent className="-mt-4">
              <div className="w-full h-[0.5] bg-gray-300"></div>
              {res.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{formatCurrency(item.price)}</span>
                </div>
              ))}
              <div className="w-full h-[0.5] bg-gray-300"></div>
              <div className="flex justify-between">
                <span>Total</span>
                <span>{formatCurrency(res.totalBeforeDiscount)}</span>
              </div>
              <div className="flex justify-between">
                <span> {res.hemat > 0 ? "Hemat" : "Admin"}</span>
                <span>
                  {res.hemat > 0 ? "-" : ""}
                  {formatCurrency(res.hemat)}
                </span>
              </div>

              <div className="w-full h-[0.5] bg-gray-300 mb-2"></div>
              <div className="flex justify-between font-bold">
                <span>Total Final</span>
                <span className="bg-green-100 py-1 px-2 rounded-md">
                  {formatCurrency(res.amountToPay)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const formatCurrency = (amount) => {
  const parse = parseFloat(amount);
  return (
    parse.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
    }) + " IDR"
  );
};
export default Home;
