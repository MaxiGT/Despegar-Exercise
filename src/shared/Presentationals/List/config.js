import ButtonsColumn from '../../Components/Grid/Columns/ButtonsColum';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

export const columnsConfig = [
  {
    title: 'Nombre',
    width: 3,
    content: ['name'],
    field: 'name',
    defaultOrder: 'ASC',
    sort: (a, b, order) => {
      if (order === 'ASC') return a.localeCompare(b);
      return b.localeCompare(a);
    }
  },
  {
    title: 'Direccion',
    width: 3,
    content: ['address'],
    field: 'address',
    defaultOrder: 'ASC',
    sort: (a, b, order) => {
      if (order === 'ASC') return a.localeCompare(b);
      return b.localeCompare(a);
    }
  },
  {
    title: 'Telefono',
    width: 3,
    content: (r) => { return r.phoneNumber },
    field: 'phoneNumber',
    defaultOrder: 'DESC',
    retrieveOrder: () => 'ASC',
    sort: (a, b, order) => {
      if (order === 'DESC') return parseInt(b.replace(/\D/g,'')) - parseInt(a.replace(/\D/g,''));
      return parseInt(a.replace(/\D/g,'')) - parseInt(b.replace(/\D/g,''));
    }
  },
  {
    title: '',
    width: 2,
    component: ButtonsColumn,
    config: [
      {
        label: '',
        name: 'edit',
        icon: FaPencilAlt,
        buttonType: 'info',
      },
      {
        label: '',
        name: 'delete',
        icon: FaTrash,
        buttonType: 'danger',
      },
    ],
  },
];