import React from 'react';
import { useFormik} from 'formik';
import "./styles.css";
import axios from "axios";
import * as Yup from 'yup';



const Form = ({setModalActive,students,setStudents,editingUser,setEditingUser}) => {
    const formik = useFormik({
        initialValues: {
                name: editingUser?.name || "",
                group: editingUser?.group || "",
                year: editingUser?.year || "",
                email: editingUser?.email || "",
                phone: editingUser?.phone || ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3,'Must be 3 characters  more')
                .max(15, 'Must be 13 characters or less')
                .required('Required field'),
            group: Yup.string()
                .min(3,'Must be 3 characters  more')
                .max(10, 'Must be 20 characters or less')
                .required('Required field'),
            year: Yup.string()
                .min(3,'Must be 3 characters  more')
                .max(10, 'Must be 20 characters or less')
                .required('Required field'),
            email: Yup.string().email('Invalid email address').required('Required'),
           phone: Yup.string()
                .min(3,'Must be 3 characters  more')
                .max(15, 'Must be 15 characters or less')
                .required('Required field')
        }),
        onSubmit: async(values) => {
            if(editingUser.name){
                    const {data:updatedUser} = await axios.put(`https://6297ae298d77ad6f75076dfd.mockapi.io/students/${editingUser.id}`,values)
                    const updateStudentList = students.map(item => item.id === updatedUser.id? updatedUser:item)
                    setStudents(updateStudentList)

            }else {
                const uploadUser = await axios.post("https://6297ae298d77ad6f75076dfd.mockapi.io/students/", values)
                setStudents([...students, uploadUser.data])
            }
            setModalActive(false)
        },
    });
    return (
       <div className="modal">
           <div className="modal-content">
               <form onSubmit={ formik.handleSubmit}>
                   <div onClick={() => {
                       setModalActive(false)
                       setEditingUser(null)
                   } }
                        className="absolute right-5 top-6 text-red-700 cursor-pointer text-transform-uppercase"><strong>x</strong></div>
                   <h1 className="text-white-500">Добавить нового студента</h1>
                   <label htmlFor="name">
                       Ф.И.О студента
                       <input
                           onChange={formik.handleChange}
                           id="name"
                           name="name"
                           value={formik.values.name}
                       />
                       {formik.errors.name?<div className="text-red-700">{formik.errors.name}</div>:null}
                   </label>
                   <label htmlFor="group">
                       Группа
                       <input
                           onChange={formik.handleChange} id="group" name="group"
                           value={formik.values.group}
                       />

                       {formik.errors.group?<div className="text-red-700">{formik.errors.group}</div>:null}
                   </label>
                   <label htmlFor="date">
                       Год поступления
                       <input
                              onChange={formik.handleChange} id="date" type="date"
                              name="year"
                              value={formik.values.year}
                       />
                       {formik.errors.year?<div className="text-red-700">{formik.errors.year}</div>:null}
                   </label>
                   <label htmlFor="email">
                       E-mail
                       <input onChange={formik.handleChange}
                              id="email" name="email"
                              value={formik.values.email}
                       />
                       {formik.errors.email?<div className="text-red-700">{formik.errors.email}</div>:null}
                   </label>
                   <label htmlFor="phone">
                       Номер телефона
                       <input  onChange={formik.handleChange}
                               id="phone" name="phone"
                               value={formik.values.phone}
                       />
                       {formik.errors.phone?<div className="text-red-700">{formik.errors.phone}</div>:null}
                   </label>
                   <div className="button-box">
                       <button type="submit">
                           {
                               editingUser?"Update":"Create"
                           }

                       </button>
                   </div>
               </form>

           </div>
       </div>
    );
}

export default Form;