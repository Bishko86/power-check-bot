function Catch(target: unknown, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: unknown[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error: unknown) {
      console.warn('Error', error);
    }
  }

  return descriptor;
}

export default Catch;
