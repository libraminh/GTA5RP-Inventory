import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const listContent = [
  {
    name: "tuanlelaodong",
    content: `
      <p>
        Mỗi tuần sẽ chọn ngẫu nhiên 2 nghề sạch với mức lương rất cao so với các ngành nghề còn lại
      </p>

      <p>
        Tuần Lễ Lao Động tuần này sẽ là Nghề Câu Cá và Nghề Sữa Bò nha mọi người, chúc anh em lao động vui vẻ
      </p>
    `,
  },
  {
    name: "trungthu",
    content: `
    <p>
      📢  Event đổi quà Trung Thu nhận giải thưởng như sau:  📢  (từ lúc thông báo - 0 giờ ngày 3 tháng 10)
    </p>

    <p>
      - Giải nhất: xe Jeep 400kg (trị giá 1.500.000 vnd)
    </p>

    <p>
      - Giải nhì: xe Mec 4k (trị giá 600.000 vnd) (có thể quy đổi ra sao)
    </p>

    <p>
      - 10 giải khuyến khích: xe ingame có cốp 150kg
    </p>

    <p>
      🎁  Cách thức nhận giải: 🎁
    </p>

    <p>
      - Chế tạo 45 cái lồng đèn (thu thập nguyên vật liệu từ các ngành nghề Rác, Điện) 
    </p>

    <p>
      - Chế tạo 10 hộp bánh trung thu (chỉ được chế tạo trong 2 ngày cuối của event, nguyên vật liệu sẽ được công bố vào lúc 0 giờ ngày 2 tháng 10) 
    </p>

    <p>
      - Giải thưởng sẽ được trao tặng đến tay người tham gia đạt đầy đủ yêu cầu trên 1 cách sớm nhất. (nộp trực tiếp cho @Slomint trong ngày cuối cùng của event) 
    </p>

    <p>
      Đối tượng tham gia: toàn bộ cư dân trong thành phố GTA5RP.VN (tất cả các ngành nghề, cơ quan nhà nước) 
    </p>

    <p>
      Chúc mọi người tham gia event vui vẻ và có một mùa trung thu ấm áp. 
    </p>
    `,
  },
  {
    name: "matuyda",
    content: `
      <p>
        📢 Event Ma Hoàng 📢
      </p>
      <p>
        - Nâng giá bán Ma Túy Đá (ma hoàng) cực kỳ cao
      </p>
      <p>
        - Loại tiền thu về: Tiền Sạch
      </p>
      <p>
        - Thời gian áp dụng: 1 tuần kể từ khi có thông báo
      </p>
    `,
  },
];

const emptyText = "Vui lòng chọn sự kiện";

const EventContent = (props) => {
  const { currentEvent } = useSelector((state) => state.eventSlice);

  const filterContent = listContent.find((item) => item.name === currentEvent);

  console.log("filterContent", filterContent);

  if (!filterContent)
    return <h2 className="text-md text-white text-center">{emptyText}</h2>;

  return (
    <div
      className="text-md space-y-2"
      dangerouslySetInnerHTML={{ __html: filterContent.content }}
    />
  );
};

EventContent.propTypes = {};

export default EventContent;
