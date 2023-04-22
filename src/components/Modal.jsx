import { Modal, Form, Input } from "antd";
import { ReactComponent as InfoIcon } from "../assets/ESM@iconset_info2.svg";

const ModalComponent = (props = {}) => {
	const {
		modalInfo,
		isModalOpen,
		setIsModalOpen,
		setModalInfo,
    dataSource,
		setDataSource,
	} = props;
  const [form] = Form.useForm();
	const handleOk = () => {
		form.submit();
   
    form.validateFields()
			.then((values) => {
        const info = {
					id: modalInfo.id ? modalInfo.id : new Date().getTime(),
					...values,
					Tags: Array.isArray(values.Tags)
						? values.Tags
						: (values.Tags ? values.Tags.split(",") : []),
				};
        let result = []
        if (Object.values(modalInfo).filter((it) => !!it).length) {
          //编辑
          result = dataSource.map((it) => {
						return {
							...(it.id === info.id ? info : it),
						};
					});
        } else {
          result = [...dataSource, info];
        }
        setDataSource(result);
        setModalInfo(info);
				setIsModalOpen(false);
        localStorage.setItem("searchtable", JSON.stringify(result));
      })
			.catch((err) => {
        console.log('err',err)
      });
	};

	const handleCancel = () => {
		setIsModalOpen(false);
    form.resetFields()
	};

	return (
		<Modal
			title={
				Object.values(modalInfo).filter((it) => !!it).length
					? "Edit SDK"
					: "Create SDK"
			}
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
			cancelText="Cancel"
			okText="Submit"
			getContainer={false}
			destroyOnClose={true}
      className="config-modal"
		>
			<Form
				form={form}
				name="basic"
				layout="vertical"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={modalInfo}
				preserve={false}
				// onFinish={onFinish}
				// onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Client name"
					name="ClientName"
					rules={[{ required: true, message: "Please input Client name!" }]}
					style={{ width: 700 }}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Board"
					name="BoardName"
					rules={[{ required: true, message: "Please input Board!" }]}
					style={{ width: 700 }}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Tags"
					name="Tags"
					rules={[{ required: false }]}
					style={{ width: 700 }}
					tooltip={{
						title: "Tooltip with customize icon",
						icon: <InfoIcon style={{ width: 20, height: 20 }} />,
					}}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Requestor"
					name="Requestor"
					style={{ width: 700 }}
					rules={[{ required: true, message: "Please input Requestor!" }]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ModalComponent;
