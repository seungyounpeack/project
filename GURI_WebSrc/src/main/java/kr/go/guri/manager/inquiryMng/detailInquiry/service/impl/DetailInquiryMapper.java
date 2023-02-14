package kr.go.guri.manager.inquiryMng.detailInquiry.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;
/**
 * 관리자 > 문의 상세 Mapper 클래스
 * @author 권기완
 * @since 2022. 06. 25.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.06.25.   	권기완          최초 생성
 *   
 * </pre>
 */
@Repository("detailInquiryMapper")
public class DetailInquiryMapper extends ComAbstractDAO {

	public Map<String, Object> selectDetailList(Map<String, Object> params) throws SQLException , IOException{
		// TODO Auto-generated method stub
		return selectOne("DetailInquiryDAO.selectDetailList", params);
	}

	public int updateInquiry(Map<String, Object> params) throws SQLException , IOException{
		// TODO Auto-generated method stub
		return update("DetailInquiryDAO.updateInquiry", params);
	}

	public int deleteInquiry(Map<String, Object> params) throws SQLException , IOException{
		// TODO Auto-generated method stub
		return update("DetailInquiryDAO.deleteInquiry", params);
	}

	public int insertInquiry(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return insert("DetailInquiryDAO.insertInquiry", params);
	}

}
