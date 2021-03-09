const Admin = () => {
  const addProduct = async (title) => {
    const res = await fetch("http://localhost:8000/todos", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });

    const todo = await res.json();
  };

  return (
    <div id="formContainer">
      <form>
        {/* <label for="title">Username:</label> */}
        <h1>Add product</h1>
        <div className="left half">
          <input type="text" name="title" placeholder="add title"></input>
          <input type="number" name="price" placeholder="add price"></input>
          <label for="category">Category:</label>
          <select name="category" id="category">
            <option value="men clothing">men clothing</option>
            <option value="jewelry">jewelry</option>
            <option value="electronics">electronics</option>
            <option value="women clothing">women clothing</option>
          </select>
          <input type="text" name="img" placeholder="add image url address"></input>
        </div>
        <div className="right half">
          <textarea rows="3" cols="30" name="description" placeholder="add description of the product"></textarea>
        </div>

        {/* <input type="file" name="upload" id="file-select"></input> */}
      </form>
    </div>
  );
};

export default Admin;
