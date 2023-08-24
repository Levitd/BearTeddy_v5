import React  from "react";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import FormikTextArea from "../common/form/formik/formikTextArea";

import {useIntl} from "react-intl";
import FormikButton from "../common/form/formik/formikButton";
import {commentCreate} from "../../store/comment";
import {useDispatch} from "react-redux";


const CommentForm = ({product_id}) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    // const handleSubmit = async (event, data) => {
    //     event.preventDefault();
    //     // dispatch(commentCreate());
    //     console.log('submit ', data)
    // }
    return (
        <Formik
            initialValues={{
                comment: '',
                parent_comment_id:'',
                product_id:product_id
            }}
            validateOnMount={true}
            validationSchema={ Yup.object({
                comment: Yup.string()
                    .min(1, 'comment_text_must_not_be_empty')
                    .required('required'),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                // setTimeout(() => {
                //     alert(JSON.stringify(values, null, 2));
                //     setSubmitting(false);
                // }, 400);
                dispatch(commentCreate(values));
                setSubmitting(false);
                resetForm({comment:""})
            }}
            >
            {formik => (
                <Form >
                    <FormikTextArea
                        placeholder={intl.messages["your_comment"]}
                        name="comment"
                        rows="4"
                    />
                    <FormikButton
                        name="submit"
                        label={"submit_comment"}
                        type="submit"
                        disabled={!formik.isValid}
                    />
                </Form>
            )}
        </Formik>
    );
}
//                 <form onSubmit={handleSubmit} >
export default CommentForm;