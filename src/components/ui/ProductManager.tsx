import React, { useEffect, useState } from "react";
import "../../styles/ProductManager.css";
/*Isoo daqui é a tela de gerenciamento de produto, podem reutilizar a logica dela para as devidas telas, assim como a logicca da app.tsx, partes importantes estao comentadas o que faz!!!!*/ 
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
    onSortOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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

        // Validação: preço deve ser maior que 0 e quantidade deve ser um número inteiro positivo
        if (
            product.name &&
            product.price > 0 &&
            product.quantity > 0 &&
            Number.isInteger(product.quantity)
        ) {
            onSave(product); // Salva ou atualiza o produto
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
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Preço:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        min="0.01"
                    />
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </div>
                <div>
                    <label>URL da Imagem:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={product.imageUrl}
                        onChange={handleChange}
                        placeholder="Cole a URL da imagem aqui"
                    />
                </div>
                <div>
                    <label>Fornecedor:</label>
                    <input
                        type="text"
                        name="supplier"
                        value={product.supplier}
                        onChange={handleChange}
                        placeholder="Nome do Fornecedor"
                        required
                    />
                </div>
                <button type="submit">{productToEdit ? "Atualizar" : "Salvar"}</button>
            </form>

            {/* Filtros acima da lista de produtos */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Filtrar por nome"
                    value={nameFilter}
                    onChange={onNameFilterChange}
                />
                <input
                    type="text"
                    placeholder="Filtrar por fornecedor"
                    value={supplierFilter}
                    onChange={onSupplierFilterChange}
                />
                <select value={sortOrder} onChange={onSortOrderChange}>
                    <option value="asc">Ordenar por preço: Crescente</option>
                    <option value="desc">Ordenar por preço: Decrescente</option>
                </select>
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
                                <button onClick={() => onEdit(prod)}>Editar</button>
                                <button onClick={() => onDelete(prod.id)}>Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductManager;
