document.getElementById('orderForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
  
    const errorDiv = document.getElementById('error');
  
    // Проверяем, чтобы телефон не отправлялся дважды
    const storedPhoneHash = localStorage.getItem('phoneHash');
    const currentPhoneHash = btoa(phone);
  
    if (storedPhoneHash === currentPhoneHash) {
      errorDiv.textContent = 'Заявка с этого номера уже отправлена.';
      errorDiv.style.display = 'block';
      return;
    }
  
    try {
      const response = await fetch('https://order.drcash.sh/v1/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer RLPUUOQAMIKSAB2PSGUECA',
        },
        body: JSON.stringify({
          stream_code: 'vv4uf',
          client: { phone, name },
        }),
      });
  
      if (response.ok) {
        // Сохраняем телефон в LocalStorage
        localStorage.setItem('phoneHash', currentPhoneHash);
        window.location.href = 'thankyou.html';
      } else {
        throw new Error('Ошибка при отправке заявки.');
      }
    } catch (error) {
      errorDiv.textContent = 'Произошла ошибка. Попробуйте снова.';
      errorDiv.style.display = 'block';
    }
  });
  