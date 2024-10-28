import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateCliente, obterClientePorId } from '../../services/ClientesService'; // Corrigido o caminho
import { Cliente } from '../../types/Cliente';

const EditarCliente: React.FC<{ id: number; onSave: () => void }> = ({ id, onSave }) => {
  const formik = useFormik<Cliente>({
    initialValues: {
      id: 0, // Ajuste conforme necessário
      nome: '',
      contato: '',
      endereco: '',
      cpf_cnpj: '',
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Nome é obrigatório'),
      contato: Yup.string().matches(/^\d{10,11}$/, 'Contato deve ter 10 ou 11 dígitos').required('Contato é obrigatório'),
      endereco: Yup.string().required('Endereço é obrigatório'),
      cpf_cnpj: Yup.string().required('CPF/CNPJ é obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        await updateCliente(values);
        onSave(); // Chama a função onSave após salvar
      } catch (error) {
        console.error(error);
        // Tratar erro
      }
    },
  });

  useEffect(() => {
    const fetchCliente = async () => {
      const cliente = await obterClientePorId(id);
      if (cliente) {
        formik.setValues(cliente);
      }
    };
    fetchCliente();
  }, [id]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        {...formik.getFieldProps('nome')}
      />
      <input
        type="text"
        placeholder="Contato"
        {...formik.getFieldProps('contato')}
      />
      <input
        type="text"
        placeholder="Endereço"
        {...formik.getFieldProps('endereco')}
      />
      <input
        type="text"
        placeholder="CPF/CNPJ"
        {...formik.getFieldProps('cpf_cnpj')}
      />
      <button type="submit">Salvar Alterações</button>
    </form>
  );
};

export default EditarCliente;