import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"; 
import { Textarea } from "./ui/textarea";
import React, { useEffect, useState } from "react";
import "../styles/ProductManager.css";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
    supplier: string;
}

interface ProductManagerProps {
    products: Product[];
    onSave: (product: Product) => void;
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
    nameFilter: string;
    supplierFilter: string;
    sortOrder: "asc" | "desc";
    onNameFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSupplierFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSortOrderChange: (value: "asc" | "desc") => void; 
    productToEdit?: Product | null;
}

const ProductManager: React.FC<ProductManagerProps> = ({
    products,
    onSave,
    onEdit,
    onDelete,
    nameFilter,
    supplierFilter,
    sortOrder,
    onNameFilterChange,
    onSupplierFilterChange,
    onSortOrderChange,
    productToEdit,
}) => {
    const [product, setProduct] = useState<Product>({
        id: 0,
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        imageUrl: "",
        supplier: "",
    });

    useEffect(() => {
        if (productToEdit) {
            setProduct(productToEdit);
        } else {
            setProduct({
                id: 0,
                name: "",
                description: "",
                price: 0,
                quantity: 0,
                imageUrl: "",
                supplier: "",
            });
        }
    }, [productToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: name === "price" || name === "quantity" ? parseFloat(value) || 0 : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            product.name &&
            product.price > 0 &&
            product.quantity > 0 &&
            Number.isInteger(product.quantity)
        ) {
            onSave(product);
            setProduct({
                id: 0,
                name: "",
                description: "",
                price: 0,
                quantity: 0,
                imageUrl: "",
                supplier: "",
            });
        } else {
            alert("Por favor, preencha os campos corretamente.");
        }
    };

    return (
        <div className="product-manager">
            <form onSubmit={handleSubmit}>
                <div>
                    <Label>Nome:</Label>
                    <Input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label>Descrição:</Label>
                    <Textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label>Preço:</Label>
                    <Input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        min="0.01"
                    />
                </div>
                <div>
                    <Label>Quantidade:</Label>
                    <Input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </div>
                <div>
                    <Label>URL da Imagem:</Label>
                    <Input
                        type="text"
                        name="imageUrl"
                        value={product.imageUrl}
                        onChange={handleChange}
                        placeholder="Cole a URL da imagem aqui"
                    />
                </div>
                <div>
                    <Label>Fornecedor:</Label>
                    <Input
                        type="text"
                        name="supplier"
                        value={product.supplier}
                        onChange={handleChange}
                        placeholder="Nome do Fornecedor"
                        required
                    />
                </div>
                <Button type="submit">{productToEdit ? "Atualizar" : "Salvar"}</Button>
            </form>

            <div className="filters">
                <Input
                    type="text"
                    placeholder="Filtrar por nome"
                    value={nameFilter}
                    onChange={onNameFilterChange}
                />
                <Input
                    type="text"
                    placeholder="Filtrar por fornecedor"
                    value={supplierFilter}
                    onChange={onSupplierFilterChange}
                />
                <Label>Ordenar por preço:</Label>
                <Select value={sortOrder} onValueChange={onSortOrderChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecionar ordem" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">Crescente</SelectItem>
                        <SelectItem value="desc">Decrescente</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <h2>Lista de Produtos</h2>
            {products.length === 0 ? (
                <p>Nenhum produto cadastrado.</p>
            ) : (
                <ul className="product-list">
                    {products.map((prod) => (
                        <li key={prod.id}>
                            <h3>{prod.name}</h3>
                            <p>{prod.description}</p>
                            <p>Preço: R$ {prod.price.toFixed(2)}</p>
                            <p>Quantidade: {prod.quantity}</p>
                            <p>Fornecedor: {prod.supplier}</p>
                            {prod.imageUrl && (
                                <img src={prod.imageUrl} alt={prod.name} style={{ maxWidth: "200px", maxHeight: "200px" }} />
                            )}
                            <div className="action-buttons">
                                <Button onClick={() => onEdit(prod)}>Editar</Button>
                                <Button variant="destructive" onClick={() => onDelete(prod.id)}>Excluir</Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductManager;
