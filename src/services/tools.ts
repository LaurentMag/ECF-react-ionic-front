class Tools {
  handleInput(e: any, setState: any): void {
    setState((prevState: any) => {
      return {
        ...prevState,
        [e.target.name]: e.target.nodeName === "ION-CHECKBOX" ? e.target.checked : e.target.value,
      };
    });
  }
}

export const tools = new Tools();
