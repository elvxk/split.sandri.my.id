import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const PersonInput = ({ person, setPeople, people, index }) => {
  const handlePersonChange = (e) => {
    const { name, value } = e.target;
    const newPeople = [...people];
    newPeople[index][name] = value;
    setPeople(newPeople);
  };

  const addItem = () => {
    const newPeople = [...people];
    newPeople[index].items.push({ name: "", price: 0 });
    setPeople(newPeople);
  };

  const removeItem = (itemIndex) => {
    const newPeople = [...people];
    newPeople[index].items.splice(itemIndex, 1);
    setPeople(newPeople);
  };

  const removePerson = () => {
    const newPeople = [...people];
    newPeople.splice(index, 1);
    setPeople(newPeople);
  };

  const handleItemChange = (e, itemIndex) => {
    const { name, value } = e.target;
    const newPeople = [...people];
    newPeople[index].items[itemIndex][name] = value;
    setPeople(newPeople);
  };

  return (
    <Card>
      <CardContent className="gap-2 p-4">
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-2">
            <Label>Nama</Label>
            <Input
              type="text"
              name="name"
              value={person.name}
              onChange={handlePersonChange}
              placeholder={`Nama pembeli ${index + 1}`}
            />
          </div>
          <div className="h-[0.5] bg-gray-300 w-full"></div>

          {person.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="flex flex-col md:flex-row  md:items-center gap-2"
            >
              <Label>Item</Label>
              <Input
                type="text"
                name="name"
                value={item.name}
                onChange={(e) => handleItemChange(e, itemIndex)}
                placeholder={`Nama barang ${itemIndex + 1}`}
              />
              <Label>Harga</Label>
              <Input
                type="number"
                name="price"
                value={item.price === 0 ? "" : item.price}
                onChange={(e) => handleItemChange(e, itemIndex)}
                placeholder={`Harga barang ${itemIndex + 1}`}
              />
              <Button
                className="md:self-end"
                onClick={() => removeItem(itemIndex)}
                variant="destructive"
              >
                <FaRegTrashAlt />
              </Button>
            </div>
          ))}
        </div>
        <div className="h-[0.5] bg-gray-300 w-full my-4"></div>
        <div className="flex flex-col gap-2 w-full md:flex-row">
          <Button onClick={addItem} variant="secondary" className="w-full">
            Add Item
          </Button>
          <Button
            onClick={removePerson}
            variant="destructive"
            className="w-full"
          >
            Remove Person
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonInput;
