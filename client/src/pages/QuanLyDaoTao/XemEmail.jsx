import { useEffect, useState } from "react";
import api from "../../services/daotao.api";
import { Button } from "@/components/ui/button";

const XemEmail = () => {
  const [emails, setEmails] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    console.log("UserID lấy từ localStorage:", userIdFromStorage);

    const userId = parseInt((userIdFromStorage || "").trim(), 10);
    
    if (!userId || isNaN(userId)) {
      console.error("UserID không hợp lệ:", userId);
      return;
    }

    api.getEmailsByUserId(userId)
      .then((res) => {
        const sorted = [...(res.data || [])].sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
        setEmails(sorted);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API getEmailsByUserId:", err);
        setEmails([]);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "DD/MM/YYYY";
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Hàm lấy đoạn ngắn (ví dụ 100 ký tự đầu, hoặc 3 dòng đầu)
  const getShortContent = (html) => {
    // Lấy text thuần, cắt 100 ký tự đầu
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.innerText || div.textContent || "";
    return text.length > 100 ? text.slice(0, 100) + "..." : text;
  };

  const handlePrint = (idx) => {
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(node => node.outerHTML)
      .join('\n');

    const html = emails[idx].content;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Email</title>
          ${styles}
          <style>
            @media print {
              body { background: white !important; }
              .print-area, .print-area * { visibility: visible !important; }
              .print-area {
                position: relative !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                max-width: 800px !important; /* hoặc 900px, tuỳ bạn */
                margin: 0 auto !important;
                background: white !important;
                z-index: 9999;
                box-sizing: border-box;
                padding: 24px 32px;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-area">${html}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const totalEmails = emails.length;
  const paginatedEmails = emails.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-left">DANH SÁCH EMAIL ĐÃ NHẬN</h1>
      <table className="w-full border text-xs">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-1">STT</th>
            <th className="border p-1">Email đã nhận được</th>
            <th className="border p-1">Ngày gửi</th>
            <th className="border p-1">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmails.length > 0 ? (
            paginatedEmails.map((email, idx) => {
              const originalIndex = (page - 1) * pageSize + idx;
              return (
                <tr key={originalIndex}>
                  <td className="border p-1 text-center">{originalIndex + 1}</td>
                  <td className="border p-1">
                    {expanded[originalIndex] ? (
                      <div dangerouslySetInnerHTML={{ __html: email.content }} />
                    ) : (
                      <span>{getShortContent(email.content)}</span>
                    )}
                  </td>
                  <td className="border p-1 text-center">{formatDate(email.sentAt)}</td>
                  <td className="border p-1 text-center space-x-1">
                    <button
                      className={`px-2 py-1 rounded text-white font-semibold ${
                        expanded[originalIndex] ? "bg-orange-400 hover:bg-orange-500" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      onClick={() => setExpanded((prev) => ({ ...prev, [originalIndex]: !prev[originalIndex] }))}
                    >
                      {expanded[originalIndex] ? "Thu gọn" : "Xem thêm"}
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white font-semibold"
                      onClick={() => handlePrint(originalIndex)}
                    >
                      In
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">Không có email nào để hiển thị.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-end items-center mt-4">
        <Button
          className="bg-white border-2 text-blue-600 font-bold rounded-none"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Quay lại
        </Button>
        <span className="border px-3 py-1 bg-blue-600 font-bold text-white">{page}</span>
        <Button
          className="bg-white border-2 text-blue-600 font-bold rounded-none"
          disabled={page * pageSize >= totalEmails}
          onClick={() => setPage((p) => p + 1)}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default XemEmail;