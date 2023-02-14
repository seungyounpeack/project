package kr.go.guri.manager.inDataMng.dataStatusMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.inDataMng.dataStatusMng.service.DataStatusMngService;


/**
 * @Description		: 주요업무등록 ServiceImpl
 * @Source        	: DataStatusMngServiceImpl.java
 * @author 김부권
 * @since 2021. 09. 23.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.09.23.   	김부권          최초 생성
 *   
 * </pre>
 */
@Service("dataStatusMngService")
public class DataStatusMngServiceImpl implements DataStatusMngService {

	@Resource(name = "dataStatusMngMapper")
	private DataStatusMngMapper dataStatusMngMapper;

	@Override
	public List<Map<String, Object>> selectScmaList() throws IOException, SQLException {
		// TODO Auto-generated method stub
		return dataStatusMngMapper.selectScmaList();
	}

	@Override
	public List<Map<String, Object>> selectScmaStatusCnt() throws IOException, SQLException {
		// TODO Auto-generated method stub
		return dataStatusMngMapper.selectScmaStatusCnt();
	}

	@Override
	public List<Map<String, Object>> selectScmaStatus(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return dataStatusMngMapper.selectScmaStatus(param);
	}




}
