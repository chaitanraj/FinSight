export async function getexpense() {
    try {
      const res = await fetch('/api/get-expense');

      if (!res.ok) return null;
      const data = await res.json();
      return data;

    } catch (err) {
      console.log("Error fetching /api/get-expense:", err);
      return null;
    }
  }