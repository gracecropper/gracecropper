import React from 'react'

const EditProducts = props => {
  return (
    <form className="updateForm" onSubmit={props.handleSubmit}>
      <label htmlFor="Update Product">
        <h2>Update Product</h2>
      </label>
      {/* Name of Product */}
      <label>Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={props.handleChange}
        value={props.updatedProduct.name}
      />
      {/* Product Type */}
      <label>Product Type:</label>
      {/* select dropdown here */}
      <select
        value={props.updatedProduct.type}
        onChange={props.handleChange}
        name="type"
      >
        <option value="" disabled>
          Type
        </option>
        <option value="Cropped Tops">Cropped Tops</option>
        <option value="Crops">Crops</option>
        <option value="Cropped Pictures">Cropped Pictures</option>
      </select>
      {/* Quantity of Product */}
      <label>Quantity:</label>
      <input
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        onChange={props.handleChange}
        name="quantity"
        value={props.updatedProduct.quantity || props.quantity}
        placeholder={props.quantity}
      />
      {/* Price of Product */}
      <label>Price:</label>
      $<input
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        onChange={props.handleChange}
        name="price"
        value={props.updatedProduct.price || props.price}
      />
      {/* Image Upload */}
      {/* need to update props!! */}
      <label>Image:</label>
      <input type="file" name="imageUrl" onChange={props.handleChange} />
      {/* Description */}
      <label>Description:</label>
      <textarea
        name="description"
        placeholder="Description"
        onChange={props.handleChange}
        value={props.updatedProduct.description}
      />
      <input type="submit" value="submit" className="submitButton" />
    </form>
  )
}

export default EditProducts
